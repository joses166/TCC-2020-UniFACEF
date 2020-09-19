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
@Table(name = "PROCEDIMENTOS")
public class Procedimento {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "IDPROCEDIMENTO")
	private Integer idprocedimento;

	@Column(name = "TITULO", nullable = false)
	private String titulo;

	@Column(name = "IMAGEM")
	private byte[] imagem;

	@Column(name = "FGATIVO", nullable = false)
	private Integer fgativo;

	@Column(name = "DESCRICAO")
	private String descricao;

	@Column(name = "STATUS", nullable = false)
	private Integer status;

	@Column(name = "DURACAO")
	private Integer duracao;

	@Column(name = "IDCATEGORIA")
	private Integer idcategoria;

}