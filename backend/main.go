package main

import (
	"github.com/not09/sa-64-job/controller"
	"github.com/not09/sa-64-job/entity"
	"github.com/not09/sa-64-job/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	api := r.Group("")
	{
		protected := api.Use(middlewares.Authorizes())
		{
			// User Routes
			protected.GET("/users", controller.ListUsers)
			protected.GET("/user/:id", controller.GetUser)
			//protected.POST("/users", controller.CreateUser)
			protected.PATCH("/users", controller.UpdateUser)
			protected.DELETE("/users/:id", controller.DeleteUser)

			// Product Routes
			protected.GET("/products", controller.ListProducts)
			protected.GET("/product/:id", controller.GetProduct)
			protected.POST("/products", controller.CreateProduct)
			protected.PATCH("/products", controller.UpdateProduct)
			protected.DELETE("/products/:id", controller.DeleteProduct)

			// Paymentmethod Routes
			protected.GET("/paymentmethods", controller.ListPaymentmethods)
			protected.GET("/paymentmethod/:id", controller.GetPaymentmethod)
			protected.GET("/paymentmethod/watched/user/:id", controller.GetPaymentmethod)
			protected.POST("/paymentmethods", controller.CreatePaymentmethod)
			protected.PATCH("/paymentmethods", controller.UpdatePaymentmethod)
			protected.DELETE("/paymentmethods/:id", controller.DeletePaymentmethod)


			// Preorder Routes
			protected.GET("/preorders", controller.ListPreorders)
			protected.GET("/preorder/:id", controller.GetPreorder)
			protected.POST("/preorders", controller.CreatePreorder)
			protected.PATCH("/preorders", controller.UpdatePreorder)
			protected.DELETE("/preorders/:id", controller.DeletePreorder)

		}
	}

	// User Routes
	r.POST("/users", controller.CreateUser)

	// Authentication Routes
	r.POST("/login", controller.Login)

	// Run the server
	r.Run()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
