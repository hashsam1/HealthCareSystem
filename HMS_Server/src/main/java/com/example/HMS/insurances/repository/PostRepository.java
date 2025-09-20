

package com.example.HMS.insurances.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.HMS.insurances.model.Claim;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Claim, String> {

}