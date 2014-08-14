package fr.bestbottle.repository;

import fr.bestbottle.domain.bottle.Opinion;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Opinion entity.
 */
public interface OpinionRepository extends JpaRepository<Opinion, Long> {

}
