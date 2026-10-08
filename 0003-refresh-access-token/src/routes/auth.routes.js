import { Router } from "express";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken, verifyAccessToken, verifyRefreshToken } from "../utils/auth.js";
;

const router = Router();

/* 
* @POST  /api/auth/register
 */

router.post("/register", async (req, res) =>{

    const  { name, email, password } = req.body;

    const isUserExist = await UserModel.findOne({ email });
    
    

    if(isUserExist){
        return res.status(400).json({
            message: "User already exists",
            errors: [
                {
                    path: "email",
                    message: "User already exists"
                }]
        })
    }

    const user = await UserModel.create({
        name,
        email,
        passwordHash: await bcrypt.hash(password, 12)
    })

    const { accessToken, refreshToken } = generateToken({ userId: user._id });
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
       httpOnly: true,
    })


    res.status(201).json({
        message: "User created successfully",
        data: {
            accessToken,
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        }
    })

});


/* 
@GET /api/auth/me
*/

router.post("/me", async (req, res) =>{

    const accessToken = req.headers.authorization?.split(" ")[1];


    try {
       const decoded = verifyAccessToken(accessToken);

       const user = await UserModel.findById(decoded.id)

       res.status(200).json({
        message:"user fetched successfully",
        user: {
            name: user.name,
            email: user.email
        }
       })
        
    } catch (error) {
        return res.status(401).json({
            message:"Unautherized, Invalid acces token "
        })
        
    }


    
})



/* 
@POST /api/auth/refresh
 */

router.post("/refresh", async (req, res) =>{

    // cookie-parser puts cookies from the request inside req.cookies.
    const refreshToken = req.cookies.refreshToken;

    if(!refreshToken)
    {
        return res.status(401).json({
            message: "Unautherized, refresh token not found",
        })
    }



    try {
      // Verify the signature and expiration before trusting this token.
      const decoded = verifyRefreshToken(refreshToken);

      // generateToken stores the user id under the "id" property.
      const user = await UserModel.findById(decoded.id);

      if (!user) {
        return res.status(401).json({
            message: "Unauthorized, user not found",
        });
      }

      // The token must match the one saved for this user.
      // This invalidates old or replaced refresh tokens.
      if (refreshToken !== user.refreshToken)
      {
        user.refreshToken = null;
        await user.save();

        return res.status(401).json({
            message: "Unauthorized, refresh token mismatch",
        });
      }

      // Rotate the tokens: replace the old refresh token with a new one.
      const { accessToken, refreshToken: newRefreshToken } = generateToken({ userId: user._id });

      // HTTP-only cookies cannot be read by browser JavaScript.
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true
      });

      // Save the new token so it can be checked on the next refresh request.
      user.refreshToken = newRefreshToken;

      await user.save();

      // Return the short-lived access token to the client.
      return res.status(200).json({
        message: "Tokens refreshed successfully",
        data: { accessToken }
      });

    } catch (error) {

        // console.log(error);
        
        return res.status(401).json({
            message:"Invalid refreshToken "
            
        })
        
    }

})

/* 
@ POST /api/auth/login
*/

router.post("/login", async (req, res) =>{
    try {

        //1 form collected
        const { email, password } = req.body;

        
        
       //2 validate data
        if(!email || !password)
        {

           return res.status(400).json({
               message: "Email and password are required",
            });

        }


       // 3 fetch user from database
        const user = await UserModel.findOne({ email });
        

        // 4 for invalid email or password
        if(!user){
            return res.status(401).json({
               message: "Invalid email or password",
           });
        }


        // 5 compare password and is it is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash);

        if(!isPasswordCorrect)
        {
            return res.status(401).json({
               message: "Invalid email or password",
             });
        }


        //6 generate token
        const { accessToken, refreshToken } = generateToken({ userId: user._id});
        
        // 7 set cookie and return login
        res.cookie("refreshToken", refreshToken, {
            httpOnly:true
        });


          return res.status(200).json({
              message: "Login successful",
              accessToken,
              refreshToken,
            });


        
    } catch (error) {

        console.error(error);

         return res.status(500).json({
           message: "Internal server error",
         });
        
    }

})


export default router;