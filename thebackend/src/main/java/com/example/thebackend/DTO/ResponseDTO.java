package com.example.thebackend.DTO;

// ResponseDto.java
public class ResponseDTO {
    private Long id;

    public ResponseDTO(Long id) {
        this.id = id;
    }

    // Getter and Setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
