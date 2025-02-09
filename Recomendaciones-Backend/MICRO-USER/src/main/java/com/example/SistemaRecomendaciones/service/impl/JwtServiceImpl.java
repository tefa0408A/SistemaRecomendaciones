package com.example.SistemaRecomendaciones.service.impl;

import com.example.SistemaRecomendaciones.aggregates.constants.Constants;
import com.example.SistemaRecomendaciones.service.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Slf4j
@Service
public class JwtServiceImpl implements JwtService {


    @Value("${key.signature}")
    private String keySignature;

    @Override
    public String extractUsername(String token) {
        return extractClaim(token,Claims::getSubject);
    }

    //TOKEN DE ACCESO
    @Override
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setHeaderParam("typ","JWT")
                .setClaims(addClaim(userDetails))
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .claim("userCreated",Constants.USER_ADMIN)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }


    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    @Override
    public String generateRefreshToken(Map<String, Object> extraClaim, UserDetails userDetails) {
        return Jwts.builder()
                .setClaims(addClaim(userDetails))
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 3600000))
                .claim("userCreated",Constants.USER_ADMIN)
                .signWith(getSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    //GENERAR METODOS DE APOYO PARA INTERACTUAR EL TOKEN

    //METODO PARA FIRMAR EL TOKEN
    private Key getSignKey(){
        log.info("CLAVE CON A QUE VAMOS A FIRMAR: "+keySignature);
        byte[] key = Decoders.BASE64.decode(keySignature);
        log.info("KEY CON LA QUE VAMOS A FIRMAR: "+ Keys.hmacShaKeyFor(key));
        return Keys.hmacShaKeyFor(key);
    }

    //METODO PAA EXTRAER EL PAYLOAD (CLAIMS) DEL TOKEN
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(getSignKey()).build()
                .parseClaimsJws(token).getBody();
    }

    //OBTENER UN ATRIBUTO DEL PAYLOAD
    private <T> T extractClaim(String token, Function<Claims, T> claimsTFunction){
        return claimsTFunction.apply(extractAllClaims(token));
    }

    //METODO PARA VALIDAR SI EL TOKEN ESTA EXPIRADO
    private boolean isTokenExpired(String token){
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    //CLAIMS PERSONALIZADOS
    private Map<String, Object> addClaim(UserDetails userDetails){
        Map<String,Object> claims = new HashMap<>();
        claims.put(Constants.CLAVE_AccountNonLocked, userDetails.isAccountNonLocked());
        claims.put(Constants.CLAVE_AccountNonExpired, userDetails.isAccountNonExpired());
        claims.put(Constants.CLAVE_CredentialsNonExpired, userDetails.isCredentialsNonExpired());
        claims.put(Constants.CLAVE_Enabled, userDetails.isEnabled());
        return claims;
    }


}
