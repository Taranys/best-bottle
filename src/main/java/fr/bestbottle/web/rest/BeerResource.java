package fr.bestbottle.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.bestbottle.domain.bottle.Beer;
import fr.bestbottle.repository.BeerRepository;
import fr.bestbottle.security.AuthoritiesConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import java.util.List;

/**
 * REST controller for managing users.
 */
@RestController
@RequestMapping("/app/rest/beers")
public class BeerResource {

	private final Logger log = LoggerFactory.getLogger(BeerResource.class);

	@Inject
	private BeerRepository beerRepository;

	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public List<Beer> getAll() {
		return beerRepository.findAll();
	}

	@RequestMapping(value = "/{id}",
					method = RequestMethod.GET,
					produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	public Beer get(@PathVariable Long id) {
		return beerRepository.getOne(id);
	}

	@RequestMapping(method = RequestMethod.POST,
					consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE)
	@Timed
	@RolesAllowed(AuthoritiesConstants.USER)
	public Beer create(@RequestBody Beer beer) {
		return beerRepository.save(beer);
	}

}
