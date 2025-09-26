package com.example.backend.api;

import jakarta.validation.constraints.NotBlank;

public class GenerateRequest {
  @NotBlank public String type;        // service | product | property
  @NotBlank public String subcategory; // e.g., Car Wash
  public String tone = "Professional";
  public String angle = "Quality";
}
