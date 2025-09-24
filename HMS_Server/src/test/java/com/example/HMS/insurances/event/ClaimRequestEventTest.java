package com.example.HMS.insurances.event;

import com.example.HMS.insurances.events.ClaimRequestEvent;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ClaimRequestEventTest {

    @Test
    void testConstructorAndGetters() {
        ClaimRequestEvent event = new ClaimRequestEvent("CID123", "POL1", 2000.0, "CORR123");

        assertEquals("CID123", event.getClaimId());
        assertEquals("POL1", event.getPolicyId());
        assertEquals(2000.0, event.getClaimAmount());
        assertEquals("CORR123", event.getCorrelationId());
    }
}
