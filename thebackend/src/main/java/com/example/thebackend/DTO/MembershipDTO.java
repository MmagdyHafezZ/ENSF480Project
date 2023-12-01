package com.example.thebackend.DTO;

import com.example.thebackend.Entity.Memberships;

public class MembershipDTO {
    private Memberships membershipType;

    // Constructor, getters, and setters
    public MembershipDTO() {}

    public Memberships getMembershipType() {
        return membershipType;
    }

    public void setMembershipType(Memberships membershipType) {
        this.membershipType = membershipType;
    }
    
}
