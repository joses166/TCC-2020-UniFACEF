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
@Table(name = "CATEGORIAS")
public class Categoria {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDCATEGORIA")
	private Integer idcategoria;

	@Column(name = "DESCRICAO", nullable = false)
	private String descricao;

	@Column(name = "TIPO", nullable = false)
	private Integer tipo;

	@Column(name = "IDEMPRESA")
	private Integer idempresa;

}