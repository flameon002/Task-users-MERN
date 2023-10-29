import mongoose from "mongoose";

export const conectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://user:UmBz8OyDgHoJ3gli@cluster0.ts4bvd2.mongodb.net/");
    console.log("Base de datos conectada exitosamente");
  } catch (error) {
    console.log(error);
    console.log('noseoipjhoihs fohasfadpfdhaoihsfdfpsdfjhpñoij');
  }
};

// userprueba
// gCJfxd6kKDOfB1iC

// userprueba2
// EqJkn2ozAbMv0s2H

// user
// UmBz8OyDgHoJ3gli
