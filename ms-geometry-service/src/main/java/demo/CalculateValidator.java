

package demo;

import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

public class CalculateValidator implements Validator {
	
	@Override
	public boolean supports(Class<?> clazz) {
		return CalculateResource.class.equals(clazz);
	}

	@Override
	public void validate(Object target, Errors e) {
		
        ValidationUtils.rejectIfEmpty(e, "input", "input.empty");


		CalculateResource p = (CalculateResource) target;

        String input = p.getInput().trim();

        // check if within range
        if( !isNumeric(input))
            e.rejectValue("input", "input value is not numeric");

        double radius  = (Double.parseDouble(input));

        // check if within range
        if( radius < 1 || radius > 100)
            e.rejectValue("input", "input value is out of range [1..100]");

    }

    //TODO: Find a better isNumeric -mes
    public  boolean isNumeric(String str)
    {
        try
        {
            double d = Double.parseDouble(str);
        }
        catch(NumberFormatException nfe)
        {
            return false;
        }
        return true;
    }

}
