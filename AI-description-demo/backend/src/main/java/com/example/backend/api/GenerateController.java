package com.example.backend.api;

import com.example.backend.gemini.GeminiClient;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GenerateController {

  private final GeminiClient gemini;

  public GenerateController(GeminiClient gemini) {
    this.gemini = gemini;
  }

  // health/diagnostic: confirms the server sees your key
  @GetMapping("/diag")
  public String diag() {
    String env = System.getenv("GEMINI_API_KEY");
    return "hasKey=" + (env != null && !env.isBlank());
  }

  @PostMapping("/generate")
  public GenerateResponse generate(@Valid @RequestBody GenerateRequest req) throws Exception {
    String prompt = buildPrompt(req.type, req.subcategory, req.tone, req.angle);
    String text = gemini.generate(prompt);
    text = text.replaceAll("\\s+", " ").trim();
    return new GenerateResponse(text, "gemini-1.5-flash-latest");
  }

  private String buildPrompt(String type, String sub, String tone, String angle) {
    return """
      You are a skilled copywriter.

      Task: Write exactly one paragraph of 40–50 words for a %s → %s.
      Tone: %s. Emphasize angle: %s.

      Constraints:
      - Only Type and Subcategory are known. Do NOT invent price, time, or location.
      - Use a benefit-led hook, one credibility cue (e.g., reviews/warranty), and ONE generic CTA (e.g., "Message us to book").
      - No emojis, no multiple CTAs, no exaggerated claims.
      """.formatted(type, sub, tone, angle);
  }
}
