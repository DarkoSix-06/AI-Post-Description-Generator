package com.example.backend.gemini;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GeminiClient {

    @Value("${gemini.apiKey:}")
    private String apiKey;

    private static final String API_BASE = "https://generativelanguage.googleapis.com/v1";
    private static final String MODEL = "gemini-2.0-flash"; // or "gemini-2.0-flash-lite"

    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    private final OkHttpClient http = new OkHttpClient();
    private final ObjectMapper mapper = new ObjectMapper();

    public String generate(String prompt) throws Exception {
        String key = (apiKey == null || apiKey.isBlank()) ? System.getenv("GEMINI_API_KEY") : apiKey;
        if (key == null || key.isBlank()) {
            throw new IllegalStateException("Missing Gemini API key. Set GEMINI_API_KEY or gemini.apiKey.");
        }

        String url = API_BASE + "/models/" + MODEL + ":generateContent?key=" + key;
        // Build request body
        ObjectNode root = mapper.createObjectNode();

        ObjectNode genCfg = root.putObject("generationConfig");
        genCfg.put("temperature", 0.65);
        genCfg.put("topP", 0.9);
        genCfg.put("maxOutputTokens", 110);

        ArrayNode contents = root.putArray("contents");
        ObjectNode content = contents.addObject();
        content.put("role", "user");
        ArrayNode parts = content.putArray("parts");
        parts.addObject().put("text", prompt);

        String body = mapper.writeValueAsString(root);

        Request req = new Request.Builder()
                .url(url)
                .post(RequestBody.create(body, JSON))
                .build();

        try (Response res = http.newCall(req).execute()) {
            String resp = res.body() != null ? res.body().string() : "";
            if (!res.isSuccessful()) {
                throw new RuntimeException("Gemini HTTP " + res.code() + ": " + resp);
            }
            JsonNode node = mapper.readTree(resp);
            JsonNode candidates = node.path("candidates");
            if (candidates.isArray() && candidates.size() > 0) {
                return candidates.get(0).path("content").path("parts").get(0).path("text").asText();
            }
            throw new RuntimeException("No candidates in Gemini response: " + resp);
        }
    }
}
