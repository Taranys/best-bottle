package fr.bestbottle.domain.bottle;

import fr.bestbottle.domain.AbstractAuditingEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "T_OPINION")
public class Opinion extends AbstractAuditingEntity implements Serializable {
	@Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @NotNull
	private Long id;

	@Size(min = 0, max = 500)
	private String location;

	@Size(min = 0, max = 50)
	private String type;

	private int rate;

	private double price;

	//quantity in cl
	private int quantity;

	@Column(columnDefinition = "text")
	private String comment;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
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
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof Opinion)) return false;

		Opinion opinion = (Opinion) o;

		if (Double.compare(opinion.price, price) != 0) return false;
		if (quantity != opinion.quantity) return false;
		if (rate != opinion.rate) return false;
		if (comment != null ? !comment.equals(opinion.comment) : opinion.comment != null) return false;
		if (id != null ? !id.equals(opinion.id) : opinion.id != null) return false;
		if (location != null ? !location.equals(opinion.location) : opinion.location != null) return false;
		if (type != null ? !type.equals(opinion.type) : opinion.type != null) return false;

		return true;
	}

	@Override
	public int hashCode() {
		int result;
		long temp;
		result = id != null ? id.hashCode() : 0;
		result = 31 * result + (location != null ? location.hashCode() : 0);
		result = 31 * result + (type != null ? type.hashCode() : 0);
		result = 31 * result + rate;
		temp = Double.doubleToLongBits(price);
		result = 31 * result + (int) (temp ^ (temp >>> 32));
		result = 31 * result + quantity;
		result = 31 * result + (comment != null ? comment.hashCode() : 0);
		return result;
	}

	@Override
	public String toString() {
		return "Opinion{" +
						"id=" + id +
						", location='" + location + '\'' +
						", type='" + type + '\'' +
						", rate=" + rate +
						", price=" + price +
						", quantity=" + quantity +
						", comment='" + comment + '\'' +
						'}';
	}
}
