package fr.bestbottle.service;

import com.codahale.metrics.annotation.Timed;
import fr.bestbottle.domain.bottle.Beer;
import fr.bestbottle.domain.bottle.BeerColor;
import fr.bestbottle.domain.bottle.Opinion;
import fr.bestbottle.repository.BeerRepository;
import fr.bestbottle.repository.OpinionRepository;
import fr.bestbottle.security.AuthoritiesConstants;
import fr.bestbottle.web.rest.dto.BeerDTO;
import fr.bestbottle.web.rest.dto.BeerOpinionDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service to manage beers and opinions.
 */
@Service
@Transactional
public class BeerService {

    private final Logger log = LoggerFactory.getLogger(BeerService.class);

    @Inject
    private BeerRepository beerRepository;

    @Inject
    private OpinionRepository opinionRepository;

    @Timed
    public List<BeerDTO> getAll() {
        return beerRepository.findAll().stream().map(beer -> new BeerDTO(beer, false)).collect(Collectors.toList());
    }

    @Timed
    public Optional<BeerDTO> get(long id) {
        return Optional.ofNullable(beerRepository.getOne(id))
                .map(BeerDTO::new);
    }

    @Timed
    @RolesAllowed(AuthoritiesConstants.USER)
    public Optional<BeerDTO> create(BeerDTO beerDTO) {
        Beer beer = saveBeer(new Beer(), beerDTO);
        return Optional.ofNullable(beerRepository.save(beer))
                .map(BeerDTO::new);
    }

    @Timed
    @RolesAllowed(AuthoritiesConstants.USER)
    public Optional<BeerDTO> update(long id, BeerDTO beerDTO) {
        Beer beer = beerRepository.getOne(id);
        beerDTO.setId(id);
        return Optional.ofNullable(saveBeer(beer, beerDTO))
                .map(BeerDTO::new);
    }

    @Timed
    @RolesAllowed(AuthoritiesConstants.ADMIN)
    public void delete(long id) {
        beerRepository.delete(id);
    }

    @Timed
    @RolesAllowed(AuthoritiesConstants.USER)
    public Optional<BeerDTO> addOpinion(long id, BeerOpinionDTO opinionDTO) {
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

                    Opinion savedOpinion = opinionRepository.save(opinion);
                    beer.addOpinion(savedOpinion);

                    return beer;
                })
                .map(beerRepository::save)
                .map(BeerDTO::new);
    }

    private Beer saveBeer(Beer beer, BeerDTO beerDTO) {
        beer.setName(beerDTO.getName());
        beer.setDescription(beerDTO.getDescription());
        beer.setColor(BeerColor.valueOf(beerDTO.getColor()));
        beer.setCountryCode(beerDTO.getCountryCode());

        return beerRepository.save(beer);
    }
}
