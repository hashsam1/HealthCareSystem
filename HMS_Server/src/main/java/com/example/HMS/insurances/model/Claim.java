package com.example.HMS.insurances.model;
import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;




@Document(collection = "claims")
public class Claim {
    public enum ClaimStatus {
        PENDING,
        APPROVED
    }

    private String claimId;
    private String policyId;
    private ClaimStatus claimStatus;
    private int claimAmount;
    private Date claimDate;

    public Claim() {
        // Default constructor
    }

    public Claim(String claimId, String policyId, ClaimStatus claimStatus, int claimAmount, Date claimDate) {
        this.claimId = claimId;
        this.policyId = policyId;
        this.claimStatus = claimStatus;
        this.claimAmount = claimAmount;
        this.claimDate = claimDate;
    }

    public String getClaimId() {
        return claimId;
    }

    public void setClaimId(String claimId) {
        this.claimId = claimId;
    }

    public String getPolicyId() {
        return policyId;
    }

    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }

    public ClaimStatus getClaimStatus() {
        return claimStatus;
    }

    public void setClaimStatus(ClaimStatus claimStatus) {
        this.claimStatus = claimStatus;
    }

    public int getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(int claimAmount) {
        this.claimAmount = claimAmount;
    }

    public Date getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(Date claimDate) {
        this.claimDate = claimDate;
    }
}