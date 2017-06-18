package demo;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CalculateController {

	@InitBinder
	protected void initBinder(WebDataBinder binder) {
		binder.setValidator(new CalculateValidator());
	}
	
	@RequestMapping(value = "/calculate", method = RequestMethod.POST)
	public ResponseEntity<CalculateResponse> calculate(
			@Valid @RequestBody CalculateResource calculateResource) {

		// System.out.println(bindingResult.getErrorCount());
		//System.out.println(calculateResource.getInput());

		double radius  = (Double.parseDouble(calculateResource.getInput().trim()));

        double area = calculateAreaOfCircle(radius);

		CalculateResponse response = new CalculateResponse();

		response.setError("");
		response.setOperation("calc-area-of-circle");
		response.setOutput(area);
		response.setSuccess(true);

		return new ResponseEntity<CalculateResponse>(response, HttpStatus.OK);
	}

	private double calculateAreaOfCircle(double radius)
    {
        return Math.PI * Math.pow(radius,2);
    }
	
}
