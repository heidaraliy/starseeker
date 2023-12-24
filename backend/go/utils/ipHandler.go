package utils

import (
	"net"
	"net/http"
)

func GetIPFromRequest(req *http.Request) string {
	ip := req.Header.Get("X-Forwarded-For")
	if ip == "" {
		ip = req.Header.Get("X-Real-Ip")
	}
	if ip == "" {
		ip, _, _ = net.SplitHostPort(req.RemoteAddr)
	}
	return ip
}
