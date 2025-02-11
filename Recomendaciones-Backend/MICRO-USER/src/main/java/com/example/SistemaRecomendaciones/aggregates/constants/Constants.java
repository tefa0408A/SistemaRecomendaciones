package com.example.SistemaRecomendaciones.aggregates.constants;

public class Constants {
    public static final Boolean STATUS_ACTIVE =true;
    public static final String CLAVE_AccountNonExpired ="isAccountNonExpired";
    public static final String CLAVE_AccountNonLocked ="isAccountNonLocked";
    public static final String CLAVE_CredentialsNonExpired = "isCredentialsNonExpired";
    public static final String CLAVE_Enabled = "isEnabled";
    public static final String USER_ADMIN = "EALFAROZ";

    public static final String ENDPOINTS_PERMIT = "/api/authentication/v1/**";
    public static final String ENDPOINTS_USER = "/api/user/v1/**";
    public static final String ENDPOINTS_ADMIN = "/api/admin/v1/**";
    public static final String ENDPOINTS_ALL_RESTAURANT = "/api/restaurant/v1/all";
    public static final String ENDPOINTS_RESTAURANTBYID = "/api/restaurant/v1/{id}";
    public static final String ENPOINTS_REVIEW_CREATED ="/api/restaurant/v1/{restauranteId}/comentario";
    public static final String ENPOINTS_REVIEWBYRESTAURANT = "/api/restaurant/v1/{restauranteId}/comentarios";

}
