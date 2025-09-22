package com.example.HMS.insurances.controller;

import com.example.HMS.insurances.model.Claim;
import com.example.HMS.insurances.service.ClaimService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InsuranceControllerTest {

    @Mock
    private ClaimService claimService;

    @InjectMocks
    private InsuranceController insuranceController;

    @Test
    void testCreateClaim() {
        Claim claim = new Claim();
        claim.setPolicyId("POL123");
        claim.setBillId(1);

        // Use matchers to avoid strict stubbing errors
        when(claimService.createAndSendClaim(anyDouble(), eq("POL123"), eq(1)))
                .thenReturn(claim);

        // Call the controller
        Claim response = insuranceController.postInsuranceClaim(claim);

        assertNotNull(response);
        assertEquals("POL123", response.getPolicyId());
        assertEquals(1, response.getBillId());

        // Verify service interaction
        verify(claimService).createAndSendClaim(anyDouble(), eq("POL123"), eq(1));
    }

    @Test
    void testGetAllClaims() {
        Claim c1 = new Claim();
        c1.setPolicyId("POL1");

        Claim c2 = new Claim();
        c2.setPolicyId("POL2");

        when(claimService.getAllClaims()).thenReturn(Arrays.asList(c1, c2));

        List<Claim> result = insuranceController.getAllClaims();

        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("POL1", result.get(0).getPolicyId());
        assertEquals("POL2", result.get(1).getPolicyId());

        verify(claimService).getAllClaims();
    }

    @Test
    void testGetClaimById() {
        Claim claim = new Claim();
        claim.setPolicyId("POL999");

        when(claimService.getClaimById("123")).thenReturn(claim);

        Claim response = insuranceController.getInsuranceDetails("123");

        assertNotNull(response);
        assertEquals("POL999", response.getPolicyId());

        verify(claimService).getClaimById("123");
    }
}
