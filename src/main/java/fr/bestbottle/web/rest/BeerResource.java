package fr.bestbottle.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.bestbottle.domain.bottle.Beer;
import fr.bestbottle.domain.bottle.BeerColor;
import fr.bestbottle.domain.bottle.BeerType;
import fr.bestbottle.repository.BeerRepository;
import fr.bestbottle.security.AuthoritiesConstants;
import fr.bestbottle.web.rest.dto.BeerDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import java.util.ArrayList;
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

	@Timed
	@Transactional
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<BeerDTO> getAll() {
		List<Beer> beerList = beerRepository.findAll();
		ArrayList<BeerDTO> beers = new ArrayList<>();
		for (Beer beer : beerList) {
			beers.add(beerToDTO(beer));
		}
		return beers;
	}

	@Timed
	@Transactional
	@RequestMapping(value = "/{id}",
					method = RequestMethod.GET,
					produces = MediaType.APPLICATION_JSON_VALUE)
	public BeerDTO get(@PathVariable Long id) {
		return beerToDTO(beerRepository.getOne(id));
	}

	@Timed
	@Transactional
	@RolesAllowed(AuthoritiesConstants.USER)
	@RequestMapping(method = RequestMethod.POST,
					consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE)
	public BeerDTO create(@RequestBody BeerDTO beerDTO) {
		Beer beer = new Beer();
		return saveBeer(beer, beerDTO);
	}

	@Timed
	@Transactional
	@RolesAllowed(AuthoritiesConstants.USER)
	@RequestMapping(value = "/{id}",
					method = RequestMethod.POST,
					consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE)
	public BeerDTO update(@PathVariable Long id, @RequestBody BeerDTO beerDTO) {
		Beer beer = beerRepository.getOne(id);
		beerDTO.setId(id);
		return saveBeer(beer, beerDTO);
	}

	@Timed
	@Transactional
	@RolesAllowed(AuthoritiesConstants.ADMIN)
	@RequestMapping(value = "/{id}",
					method = RequestMethod.DELETE,
					consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE)
	public void delete(@PathVariable Long id) {
		beerRepository.delete(id);
	}

	private BeerDTO saveBeer(Beer beer, BeerDTO beerDTO) {
		beer.setName(beerDTO.getName());
		beer.setDescription(beerDTO.getDescription());
		beer.setColor(BeerColor.valueOf(beerDTO.getColor()));
		beer.setCountryCode(beerDTO.getCountryCode());

		Beer saved = beerRepository.save(beer);
		return beerToDTO(saved);
	}

	private BeerDTO beerToDTO(Beer beer) {
		return new BeerDTO(
						beer.getId(),
						beer.getName(),
						beer.getDescription(),
						beer.getPreview(),
						beer.getRate(BeerType.DRAFT),
						beer.getRate(BeerType.BOTTLE),
						beer.getColor().name(),
						beer.getCountryCode()
		);
	}
}
