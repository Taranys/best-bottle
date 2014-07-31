package fr.bestbottle.web.rest.dto;

public class BeerDTO {
    private Long id;

    private String name;

    private String description;

    private String preview;

    private int draftRate;

    private int bottleRate;

    private String color;

    private String countryCode;

    public BeerDTO() {
    }

    public BeerDTO(Long id, String name, String description, String preview, int draftRate, int bottleRate, String color, String countryCode) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.preview = preview;
        this.draftRate = draftRate;
        this.bottleRate = bottleRate;
        this.color = color;
        this.countryCode = countryCode;
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
                '}';
    }
}

