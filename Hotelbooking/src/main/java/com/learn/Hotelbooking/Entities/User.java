package com.learn.Hotelbooking.Entities;

import java.util.Arrays;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;
	@NotBlank(message = "Name must not be empty")
	@Pattern(regexp = "^[A-Za-z ]+$", message = "Name must contain only alphabets and spaces")
	private String name;
	private String password;
	@Column(unique = true)
	private String email;

	@ManyToOne
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return Arrays.asList(new SimpleGrantedAuthority(role.getRoleName().toString()));
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
