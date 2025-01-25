import { IUser } from '../models/userModel';
import User from '../models/userModel';
import { generateToken } from "../helper/jwtHelper";

const userResolvers = {
  Query: {
    getUser: async (_: unknown, { email }: { email: string }): Promise<IUser | null> => {
      try{
        const getUser = await User.findOne({ email });
        return getUser;
      } catch(error){ 
        throw new Error(`getUser failed to fetch: ${error}`)
      }
    
    },
    getAllUsers:  async () : Promise<IUser[]> => {
      try{
        return await User.find();
      } catch(error){
        throw new Error(`getAllUsers failed to fetch: ${error}`)
      }
     
    }
  },
  Mutation: {
    loginUser: async (_: unknown, { email }: { email: string }): Promise<{ token: string, user: IUser } | null> => {
      const user = await User.findOne({ email: { $regex: `^${email}$`, $options: "i" } }); 
      if (!user) {
        throw new Error("Invalid credentials");
      }
      const token = generateToken({ id: user._id, email: user.email });
      return { token, user };
    },
    createUser: async (_: unknown, { username, email, dailyGoal, createdAt }: IUser): Promise<IUser | null> => {
      try {
        const normalizedEmail = email.toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          throw new Error('User email already exists.');
        }
        const newUser = new User({ 
          username, 
          email: normalizedEmail, 
          dailyGoal, 
          createdAt 
        });
        return await newUser.save();  
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message || 'An unexpected error occurred while creating the user.');
        }
        throw new Error('An unexpected error occurred while creating the user.');
      }
    },
  },
};

export default userResolvers;
