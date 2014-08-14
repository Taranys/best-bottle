package fr.bestbottle.web.rest.dto;

import fr.bestbottle.domain.bottle.BeerType;
import fr.bestbottle.domain.bottle.Opinion;

public class BeerOpinionDTO {

    private Long id;

    private String location;

    private BeerType type;

    private int rate;

    private double price;

    //quantity in cl
    private int quantity;

    private String comment;

    public BeerOpinionDTO() {

    }

    public BeerOpinionDTO(Opinion opinion) {
        this.id = opinion.getId();
        this.location = opinion.getLocation();
        this.type = BeerType.valueOf(opinion.getType());
        this.rate = opinion.getRate();
        this.price = opinion.getPrice();
        this.quantity = opinion.getQuantity();
        this.comment = opinion.getComment();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public BeerType getType() {
        return type;
    }

    public void setType(BeerType type) {
        this.type = type;
    }

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    @Override
    public String toString() {
        return "BeerOpinionDTO{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", type=" + type +
                ", rate=" + rate +
                ", price=" + price +
                ", quantity=" + quantity +
                ", comment='" + comment + '\'' +
                '}';
    }
}
