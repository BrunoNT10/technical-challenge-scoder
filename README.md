# Technical Challenge Scoder

Welcome! <br>
This repository stores the **Suricato Products** project, that consists in a page of products, where user can access the products registered in the database.

### Access Key to Interface
If you are here, problably you are a Meerkat Coder. So here is the Key to access the Suricato Products page:

`Grupo`

Meerkats works in group, so this is our key.

### Access Interface
I did deploy of application in de Droplet of Digital Ocean, setting a server to this application. The url to access is:

- [Interface](http://159.89.86.218:3001) <br>
- [API Swagger](http://159.89.86.218:3000/docs)

### Functionalitys

The functionalitys available are:
- **Login**: it is a simple login system that uses a specific key verified in the front, only to use the protected routes ![image](https://github.com/user-attachments/assets/143f1f35-d1a6-48eb-8e54-ce2bd3d741fa)
- **View products**: all products are available in a table in home page ![image](https://github.com/user-attachments/assets/8bb289f5-7be3-4be8-973b-012df3719f66)
- **Edit products**: in the table, the user can edit the products clicking on icon. It will open the following screen (image) ![image](https://github.com/user-attachments/assets/2df64277-29cb-42b3-929b-d6019921a7dc)
- **Delete Products**: The user can delete a product clicking on exclude icon, it removes the product from database and cache ![image](https://github.com/user-attachments/assets/de367d61-11be-4271-a378-872d55ed63bb)
- **Register new product**: The user can register a new product in a particular page ![image](https://github.com/user-attachments/assets/1452102f-0ae3-4498-ae02-52128db6f3b6)

### How It works?
The project consists in:
- **API**: An api developed using `nestjs`
- **Database**: MySQL for database
- **Cache (Redis)**: Redis for cache integrated with nest js
- **Interface**: React with typescript, and Tailwind for CSS

All services was hosted in `Droplet Service` of DigitalOcean. I create a virtual machine and run the docker-compose inside this.
Do you want test locally? Run the docker-compose file that all project will be build.

1. Copy the .env.example to a .env file, fill the infos and go to the next step
2. Run the following command in the root: 
```
docker-compose up -d --build
```

It will run the api in the port 3000 and interface in the port 3001.

