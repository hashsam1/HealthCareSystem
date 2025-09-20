package com.example.HMS.insurances.events;

public class ClaimResponseEvent {
    private String claimId;
    private String correlationId;
    private String status;     // APPROVED or REJECTED
    private String insurerRef;

    public ClaimResponseEvent() {
    }

    public ClaimResponseEvent(String claimId, String correlationId, String status, String insurerRef) {
        this.claimId = claimId;
        this.correlationId = correlationId;
        this.status = status;
        this.insurerRef = insurerRef;
    }

    public String getClaimId() {
        return claimId;
    }

    public void setClaimId(String claimId) {
        this.claimId = claimId;
    }

    public String getCorrelationId() {
        return correlationId;
    }

    public void setCorrelationId(String correlationId) {
        this.correlationId = correlationId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getInsurerRef() {
        return insurerRef;
    }

    public void setInsurerRef(String insurerRef) {
        this.insurerRef = insurerRef;
    }
}
