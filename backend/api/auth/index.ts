import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/backend/lib/db/db';
import AdminUser from '@/backend/models/AdminUser';
import { comparePassword } from '@/backend/lib/auth/hash';
import { createToken, verifyToken } from '@/backend/lib/auth/jwt';

/**
 * Login handler
 */
export async function loginHandler(request: NextRequest) {
  try {
    // Parse request body
    const { email, password } = await request.json();

    // Validate fields
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await AdminUser.findOne({ email: email.toLowerCase() });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Compare password
    const isValidPassword = await comparePassword(password, user.passwordHash);
console.log("Login email:", email);
console.log("Login password:", password);
console.log("Stored hash:", user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT
    const token = createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Logged in successfully' },
      { status: 200 }
    );

    // Set HttpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}


/**
 * Logout handler
 */
export async function logoutHandler() {
  try {
    // Create response
    const response = NextResponse.json(
      { success: true, message: 'Logged out' },
      { status: 200 }
    );

    // Clear the auth cookie by setting it to empty with maxAge 0
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get current user handler
 */
export async function meHandler(request: NextRequest) {
  try {
    // Read JWT from HttpOnly cookie
    const token = request.cookies.get('auth-token')?.value;

    // If no token, return unauthenticated
    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }

    // Verify token
    try {
      const decoded = verifyToken(token);

      // Return authenticated user info
      return NextResponse.json(
        {
          authenticated: true,
          user: {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role,
          },
        },
        { status: 200 }
      );
    } catch (verifyError) {
      // Token is invalid or expired
      return NextResponse.json(
        { authenticated: false },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  }
}
