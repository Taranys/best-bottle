package fr.bestbottle.web.rest;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
class BeerExceptionHandler {

    @ExceptionHandler
    @ResponseStatus(HttpStatus.PRECONDITION_FAILED)
    @ResponseBody
    String handleException(IllegalArgumentException ex) {
        return ex.getMessage();
    }
}
