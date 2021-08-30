// export const Add_To_Cart="Add_to_Cart";
export const addToCart =(data)=>{
    console.log("action data check",data);
    return{
        type: "Add_To_Cart",
        data:data
    };
}