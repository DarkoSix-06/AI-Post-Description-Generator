package com.example.backend.api;

public class GenerateResponse {
  public String description;
  public String model;

  public GenerateResponse(String description, String model) {
    this.description = description;
    this.model = model;
  }
}
