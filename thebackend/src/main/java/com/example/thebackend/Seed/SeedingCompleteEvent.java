package com.example.thebackend.Seed;

import org.springframework.context.ApplicationEvent;

public class SeedingCompleteEvent extends ApplicationEvent {
    public SeedingCompleteEvent(Object source) {
        super(source);
    }
}
