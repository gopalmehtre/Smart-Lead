import User from "../models/User";
import { generateToken } from "../utils/jwt";
import { RegisterBody, LoginBody, AuthResponse, UserRole } from "../types";

export const registerUser = async (
  body: RegisterBody
): Promise<AuthResponse> => {
  const { name, email, password, role } = body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw Object.assign(new Error("User with this email already exists"), {
      statusCode: 409,
    });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role || UserRole.SALES,
  });

  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const token = generateToken(payload);

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const loginUser = async (body: LoginBody): Promise<AuthResponse> => {
  const { email, password } = body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw Object.assign(new Error("Invalid email or password"), {
      statusCode: 401,
    });
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw Object.assign(new Error("Invalid email or password"), {
      statusCode: 401,
    });
  }

  const payload = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    name: user.name,
  };

  const token = generateToken(payload);

  return {
    token,
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
