package com.example.HMS.insurances.model;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;




@Document(collection = "claims")
public class Claim {
    public enum ClaimStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
    @Id
    private String claimId;
    private String policyId;
    private ClaimStatus claimStatus;
    private double claimAmount;
    private Date claimDate;
    private int billId;

    public Claim() {
        // Default constructor
        // Automatically set claimDate to current date
        this.claimDate = new Date();
    }

    public Claim(String claimId,int billId, String policyId, ClaimStatus claimStatus, double claimAmount, Date claimDate) {
        this.claimId = claimId;
        this.policyId = policyId;
        this.claimStatus = claimStatus;
        this.claimAmount = claimAmount;
        this.claimDate = claimDate;
        this.billId = billId;
    }
    public int getBillId() { return billId; }
    public void setBillId(int billId) { this.billId = billId; }
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

    public double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public Date getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(Date claimDate) {
        this.claimDate = claimDate;
    }
    @Override
    public String toString() {
        return "Claim{" +
                "claimId='" + claimId + '\'' +
                ", policyId='" + policyId + '\'' +
                ", claimStatus=" + claimStatus +
                ", claimAmount=" + claimAmount +
                ", claimDate=" + claimDate +
                '}';
    }

    }