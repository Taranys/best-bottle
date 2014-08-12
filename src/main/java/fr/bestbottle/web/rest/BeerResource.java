package fr.bestbottle.web.rest;

import com.codahale.metrics.annotation.Timed;
import fr.bestbottle.domain.bottle.Beer;
import fr.bestbottle.domain.bottle.BeerColor;
import fr.bestbottle.domain.bottle.Opinion;
import fr.bestbottle.repository.BeerRepository;
import fr.bestbottle.security.AuthoritiesConstants;
import fr.bestbottle.web.rest.dto.BeerDTO;
import fr.bestbottle.web.rest.dto.BeerOpinionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        return beerRepository.findAll().stream().map(BeerDTO::new).collect(Collectors.toList());
    }

	@Timed
	@Transactional
	@RequestMapping(value = "/{id}",
					method = RequestMethod.GET,
					produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> get(@PathVariable Long id) {
        return new ResponseEntity<BeerDTO>(new BeerDTO(beerRepository.getOne(id)), HttpStatus.OK);
    }

    @Timed
    @Transactional
    @RequestMapping(value = "/{id}/opinions",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<BeerOpinionDTO>> getOpinion(@PathVariable Long id) {

        return Optional.ofNullable(beerRepository.getOne(id))
                .map(beer -> {
                            return new ResponseEntity<List<BeerOpinionDTO>>(
                                    //convert each opinion to opinionDTO and return a new Array
                                    beer.getOpinions().stream()
                                            .map(BeerOpinionDTO::new)
                                            .collect(Collectors.<BeerOpinionDTO>toList()),
                                    HttpStatus.OK);
                        }
                )
                .orElse(new ResponseEntity<List<BeerOpinionDTO>>(HttpStatus.NOT_FOUND));
    }

	@Timed
	@Transactional
	@RolesAllowed(AuthoritiesConstants.USER)
	@RequestMapping(method = RequestMethod.POST,
					consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> create(@RequestBody BeerDTO beerDTO) {
        Beer beer = new Beer();
        return Optional.ofNullable(saveBeer(beer, beerDTO))
                .map(savedBeer -> new ResponseEntity<>(new BeerDTO(savedBeer), HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

	@Timed
	@Transactional
	@RolesAllowed(AuthoritiesConstants.USER)
	@RequestMapping(value = "/{id}",
					method = RequestMethod.POST,
					consumes = MediaType.APPLICATION_JSON_VALUE,
					produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> update(@PathVariable Long id, @RequestBody BeerDTO beerDTO) {
        Beer beer = beerRepository.getOne(id);
		beerDTO.setId(id);
        return Optional.ofNullable(saveBeer(beer, beerDTO))
                .map(savedBeer -> new ResponseEntity<>(new BeerDTO(savedBeer), HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
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


//	@Timed
//	@Transactional
//	@RequestMapping(value = "/{id}/opinions",
//					method = RequestMethod.GET,
//					produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<List<BeerOpinionDTO>> getOpinion(@PathVariable Long id) {
//		return Optional.ofNullable(beerRepository.getOne(id))
//						.map(beer -> new ResponseEntity<>(
//										//convert each opinion to opinionDTO and return a new Array
//										beer.getOpinions().stream()
//														.map(BeerOpinionDTO::new)
//														.collect(Collectors.<BeerOpinionDTO>toList()),
//										HttpStatus.OK)
//						)
//						.orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
//	}

    @Timed
    @Transactional
    @RequestMapping(value = "/{id}/opinions",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> getOpinion(@PathVariable Long id, @RequestBody BeerOpinionDTO opinionDTO) {
        if (opinionDTO.getType() == null) {
            throw new IllegalArgumentException("You have to specify a beer type");
        }
        return Optional.ofNullable(beerRepository.getOne(id))
                .map(beer -> {
                    Opinion opinion = new Opinion();
                    opinion.setComment(opinionDTO.getComment());
                    opinion.setLocation(opinionDTO.getLocation());
                    opinion.setPrice(opinionDTO.getPrice());
                    opinion.setQuantity(opinionDTO.getQuantity());
                    opinion.setRate(opinionDTO.getRate());
                    opinion.setType(opinionDTO.getType().name());

                    beer.getOpinions().add(opinion);
                    Beer savedBeer = beerRepository.save(beer);
                    return new ResponseEntity<>(new BeerDTO(savedBeer), HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    private Beer saveBeer(Beer beer, BeerDTO beerDTO) {
        beer.setName(beerDTO.getName());
		beer.setDescription(beerDTO.getDescription());
		beer.setColor(BeerColor.valueOf(beerDTO.getColor()));
		beer.setCountryCode(beerDTO.getCountryCode());

        return beerRepository.save(beer);
    }
}
