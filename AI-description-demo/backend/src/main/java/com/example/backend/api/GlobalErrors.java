package com.example.backend.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalErrors {
  @ExceptionHandler(Exception.class)
  public ResponseEntity<String> handle(Exception e) {
    // 502 so the frontend knows it's an upstream/generation error
    return ResponseEntity.status(502).body(e.getMessage());
  }
}
