package br.com.marqfacil.api.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProcedimentosSelectMultipleDto {

	private Integer value;
	private String label;
	private Integer duracao;

}
