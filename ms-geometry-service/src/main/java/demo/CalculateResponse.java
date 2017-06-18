package demo;


public class CalculateResponse {
	
	private boolean success;

	public boolean getSuccess() {
		return success;
	}

	public void setSuccess(boolean success) {
		this.success = success;
	}

	private double output;

	public double getOutput() {
		return output;
	}

	public void setOutput(double output) {
		this.output = output;
	}

	private String operation;

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	private String error;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = operation;
	}
}
