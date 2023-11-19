// models/model.go
package models

type Model struct {
    ID          int
    Name        string
    Parameters  map[string]interface{}
    // Other fields...
}
