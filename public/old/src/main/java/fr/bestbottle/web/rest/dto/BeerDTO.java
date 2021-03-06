package fr.bestbottle.web.rest.dto;

import fr.bestbottle.domain.bottle.Beer;
import fr.bestbottle.domain.bottle.BeerType;
import fr.bestbottle.domain.bottle.Opinion;
import org.joda.time.DateTime;

import java.util.ArrayList;
import java.util.List;

public class BeerDTO {
    private Long id;

    private String name;

    private String description;

    private String preview;

    private int draftRate;

    private int bottleRate;

    private String color;

    private String countryCode;

    private List<BeerOpinionDTO> opinions = new ArrayList<>();

    private String creator;

    private DateTime lastModified;

    public BeerDTO() {
    }

    public BeerDTO(Beer beer) {
        this(beer, true);
    }

    public BeerDTO(Beer beer, boolean loadOpinions) {
        this.id = beer.getId();
        this.name = beer.getName();
        this.description = beer.getDescription();
        this.preview = beer.getPreview();
        this.draftRate = beer.getRate(BeerType.DRAFT);
        this.bottleRate = beer.getRate(BeerType.BOTTLE);
        this.color = beer.getColor().name();
        this.countryCode = beer.getCountryCode();
        if (loadOpinions) {
            for (Opinion opinion : beer.getOpinions()) {
                this.opinions.add(new BeerOpinionDTO(opinion));
            }
        }
        this.creator = beer.getCreatedBy();
        this.lastModified = beer.getLastModifiedDate();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPreview() {
        return preview;
    }

    public void setPreview(String preview) {
        this.preview = preview;
    }

    public int getDraftRate() {
        return draftRate;
    }

    public void setDraftRate(int draftRate) {
        this.draftRate = draftRate;
    }

    public int getBottleRate() {
        return bottleRate;
    }

    public void setBottleRate(int bottleRate) {
        this.bottleRate = bottleRate;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public List<BeerOpinionDTO> getOpinions() {
        return opinions;
    }

    public void setOpinions(List<BeerOpinionDTO> opinions) {
        this.opinions = opinions;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public DateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(DateTime lastModified) {
        this.lastModified = lastModified;
    }

    @Override
    public String toString() {
        return "BeerDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", preview='" + preview + '\'' +
                ", draftRate=" + draftRate +
                ", bottleRate=" + bottleRate +
                ", color='" + color + '\'' +
                ", countryCode='" + countryCode + '\'' +
                ", opinions=" + opinions +
                ", creator='" + creator + '\'' +
                ", lastModified=" + lastModified +
                '}';
    }
}

