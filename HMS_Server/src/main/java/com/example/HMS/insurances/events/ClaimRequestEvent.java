package com.example.HMS.insurances.events;

public class ClaimRequestEvent {
    private String claimId;
    private String policyId;
    private double claimAmount;
    private String correlationId;

    public ClaimRequestEvent() {
    }

    public ClaimRequestEvent(String claimId, String policyId, double claimAmount, String correlationId) {
        this.claimId = claimId;
        this.policyId = policyId;
        this.claimAmount = claimAmount;
        this.correlationId = correlationId;
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

    public double getClaimAmount() {
        return claimAmount;
    }

    public void setClaimAmount(double claimAmount) {
        this.claimAmount = claimAmount;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }
}
