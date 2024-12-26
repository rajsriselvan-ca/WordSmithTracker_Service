import { IUser } from '../models/userModel';
import User from '../models/userModel';

const userResolvers = {
  Query: {
    getUser: async (_: unknown, { email }: { email: string }): Promise<IUser | null> => {
      try{
        return await User.findOne({ email });
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
    createUser: async (_: unknown, { username, email, dailyGoal, createdAt }: IUser): Promise<IUser> => {
      try {
        const newUser = new User({ username, email, dailyGoal, createdAt });
      return await newUser.save();
      } catch(error){
        throw new Error(`createUser failed to fetch: ${error}`)
      }
    },
  },
};

export default userResolvers;
