
Registration

*route for registration /auth,registration Registration have 3 fields.

    f_name
    id
    l_name
    password

Login

    route for login /auth/login to check wether the user is present or not.

    f_name
    password change password into token form to validate and to make password secure with the help of "jwt".

User

we have to perform CRUD operation here.

    if user isn't present so create user in database.
    if user present updation facility.
    deletion of user with the help of id.
    retrive whole user data with specific id.

Product

    route : /products/:id. it icludes..

    product_id
    product_image
    product_name

reviews

*route : /products/id/reviews.

    with the user specific id we have to concatinate the specific user f_name with the specific product's _name,_id.
