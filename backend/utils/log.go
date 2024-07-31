package utils

import (
	"log"

	"github.com/labstack/echo/v5"
)

func LogErrors(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		if err := next(c); err != nil {
			log.Println(err)
			return err
		}
		return nil
	}
}
