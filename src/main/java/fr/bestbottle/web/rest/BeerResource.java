package fr.bestbottle.web.rest;

import fr.bestbottle.security.AuthoritiesConstants;
import fr.bestbottle.service.BeerService;
import fr.bestbottle.web.rest.dto.BeerDTO;
import fr.bestbottle.web.rest.dto.BeerOpinionDTO;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
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
    private BeerService beerService;

    @RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public List<BeerDTO> getAll() {
        return beerService.getAll();
    }

    @RequestMapping(value = "/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> get(@PathVariable Long id) {
        if (id == null) {
            throw new IllegalStateException("id is empty");
        }

        return beerService.get(id)
                .map(beer -> new ResponseEntity<>(beer, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @RolesAllowed(AuthoritiesConstants.USER)
    @RequestMapping(method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> create(@RequestBody BeerDTO beerDTO) {
        valid(beerDTO);
        return beerService.create(beerDTO)
                .map(savedBeer -> new ResponseEntity<>(savedBeer, HttpStatus.CREATED))
                .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @RolesAllowed(AuthoritiesConstants.USER)
    @RequestMapping(value = "/{id}",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> update(@PathVariable Long id, @RequestBody BeerDTO beerDTO) {
        valid(beerDTO);
        return beerService.update(id, beerDTO)
                .map(beer -> new ResponseEntity<>(beer, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    @RolesAllowed(AuthoritiesConstants.ADMIN)
    @RequestMapping(value = "/{id}",
            method = RequestMethod.DELETE,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public void delete(@PathVariable Long id) {
        beerService.delete(id);
    }

    @RolesAllowed(AuthoritiesConstants.USER)
    @RequestMapping(value = "/{id}/opinions",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BeerDTO> addOpinion(@PathVariable Long id, @RequestBody BeerOpinionDTO opinionDTO) {
        valid(opinionDTO);
        if (opinionDTO.getType() == null) {
            throw new IllegalArgumentException("You have to specify a beer type");
        }

        return beerService.addOpinion(id, opinionDTO)
                .map(beer -> new ResponseEntity<>(beer, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    private void valid(BeerDTO beerDTO) {
        beerDTO.setName(StringUtils.trimToEmpty(beerDTO.getName()));
        beerDTO.setColor(StringUtils.trimToEmpty(beerDTO.getColor()));
        beerDTO.setCountryCode(StringUtils.trimToEmpty(beerDTO.getCountryCode()));

        if (StringUtils.isEmpty(beerDTO.getName())) {
            throw new IllegalArgumentException("beer name should not be null or empty");
        }

        if (StringUtils.isEmpty(beerDTO.getColor())) {
            throw new IllegalArgumentException("beer color should not be null or empty");
        }

        if (StringUtils.isEmpty(beerDTO.getCountryCode())) {
            throw new IllegalArgumentException("beer country should not be null or empty");
        }
    }

    private void valid(BeerOpinionDTO opinionDTO) {
        int rate = opinionDTO.getRate();
        if (rate < 1 || rate > 10) {
            throw new IllegalArgumentException("opinion rate should be between 1 and 10");
        }

        if (opinionDTO.getType() == null) {
            throw new IllegalArgumentException("opinion type cannot be empty");
        }

        if (opinionDTO.getPrice() < 0) {
            throw new IllegalArgumentException("opinion price cannot be negative");
        }
    }
}
