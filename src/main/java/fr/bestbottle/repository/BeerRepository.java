package fr.bestbottle.repository;

import fr.bestbottle.domain.bottle.Beer;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Beer entity.
 */
public interface BeerRepository extends JpaRepository<Beer, Long> {

}
