package br.com.marqfacil.api.dtos;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProdutoDto {

	private Integer idproduto;

	@Length(max = 80, message = "O atributo titulo deve possuir no máximo 80 caracteres.")
	@NotNull(message = "O atributo titulo não pode ser nulo.")
	@NotEmpty(message = "O atributo titulo não pode ser vazio.")
	private String titulo;

	@Length(max = 80, message = "O atributo descrição deve possuir no máximo 150 caracteres.")
	private String descricao;

	private byte[] imagem;

	@Min(value = 0L, message = "O atributo preço deve possuir um valor positivo.")
	private float preco;

	@NotNull(message = "O atributo status não pode ser nulo.")
	private Integer status;

	@Min(value = 0L, message = "O atributo idcategoria deve possuir um valor positivo.")
	@NotNull(message = "O atributo idcategoria não pode ser nulo.")
	private Integer idcategoria;

}
