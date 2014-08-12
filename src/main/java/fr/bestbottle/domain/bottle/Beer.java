package fr.bestbottle.domain.bottle;

import javax.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
@Table(name = "T_BEER")
public class Beer extends Bottle {
    @ElementCollection
    @CollectionTable(name = "beer_rate", joinColumns = @JoinColumn(name = "id"))
    @MapKeyColumn(name = "type", nullable = false)
    @MapKeyEnumerated(EnumType.STRING)
    @Column(name = "rate")
    private final Map<BeerType, Integer> rates = new HashMap<>();

    @Column(name = "country_code")
    private String countryCode;

    @Enumerated(EnumType.STRING)
    private BeerColor color;

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public BeerColor getColor() {
        return color;
    }

    public void setColor(BeerColor color) {
        this.color = color;
    }

    public Integer getRate(BeerType type) {
        Integer rate = rates.get(type);
        return (rate == null) ? -1 : rate;
    }

    public void setRate(BeerType type, int rate) {
        this.rates.put(type, rate);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Beer)) return false;
        if (!super.equals(o)) return false;

        Beer beer = (Beer) o;

        if (color != beer.color) return false;
        if (countryCode != null ? !countryCode.equals(beer.countryCode) : beer.countryCode != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = super.hashCode();
        result = 31 * result + (countryCode != null ? countryCode.hashCode() : 0);
        result = 31 * result + (color != null ? color.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Beer{" +
                "countryCode='" + countryCode + '\'' +
                ", color=" + color +
                '}';
    }
}
