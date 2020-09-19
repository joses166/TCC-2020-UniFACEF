package br.com.marqfacil.api.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "PRODUTOS")
public class Produto {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDPRODUTO")
	private Integer idproduto;

	@Column(name = "TITULO", nullable = false)
	private String titulo;

	@Column(name = "DESCRICAO")
	private String descricao;

	@Column(name = "IMAGEM")
	private byte[] imagem;

	@Column(name = "PRECO")
	private Float preco;

	@Column(name = "STATUS", nullable = false)
	private Integer status;

	@Column(name = "FGATIVO", nullable = false)
	private Integer fgativo;

	@Column(name = "IDCATEGORIA")
	private Integer idcategoria;

}